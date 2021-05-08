// TODO: test を追加

import requestPromise from 'request-promise';

const url = `${process.env.SHOWCASE_URL}/song?client_id=${process.env.SHOWCASE_CLIENT_ID}`;

interface MusicElement {
  id: number;
  user: string;
  url: string;
  title: string;
}

interface MusicsClosure {
  fetch: () => Promise<MusicElement[]>;
  add: (
    _arg: Pick<MusicElement, 'user' | 'url' | 'title'>
  ) => Promise<MusicElement[]>;
  remove: (
    _arg: Pick<MusicElement, 'user'> & { idx: number }
  ) => Promise<MusicElement[]>;
  val: () => MusicElement[];
}

/**
 * 音楽リストに関するクロージャを作成する関数
 */
export const newMusics = (): MusicsClosure => {
  let musicLists: MusicElement[] = [];

  /**
   * musicLists を更新する
   * @returns musicLists
   */
  const fetch = async () => {
    const lists = await requestPromise(op('get'));
    musicLists = lists;
    return musicLists;
  };

  /**
   * 曲を追加し、musicLists を更新する
   * @param user 追加した人
   * @param url 曲の URL
   * @param title 曲のタイトル
   * @returns musicLists
   */
  const add = async ({
    user,
    url,
    title,
  }: {
    user: string;
    url: string;
    title: string;
  }) => {
    await requestPromise(
      op('post', {
        user,
        url,
        title,
      })
    );
    return await fetch();
  };

  /**
   * 曲を削除し、musicLists を更新する
   * @param idx 削除したい曲のインデックス
   * @param user 削除しようとしてる人の traQID
   * @returns musicLists
   */
  const remove = async ({ idx, user }: { idx: number; user: string }) => {
    if (idx >= musicLists.length || idx < 0) {
      throw new Error('Index out of range');
    }
    if (musicLists[idx].user !== user) {
      throw new Error(`${user} cannnot remove this song`);
    }
    await requestPromise({
      method: 'delete',
      uri: `${url}&id=${musicLists[idx].id}&user=${user}`,
      headers: { 'Content-type': 'application/json' },
      json: true,
    });
    return await fetch();
  };

  fetch();
  return {
    fetch,
    add,
    remove,
    val: () => musicLists,
  };
};

const op = (method: string, qs?: unknown) => ({
  method,
  uri: url,
  qs,
  headers: { 'Content-type': 'application/json' },
  json: true,
});

/**
 * YouTube のリンクかどうかを返す
 * @param url URL
 * @returns boolean
 */
export const isYouTubeURL = (url: URL): boolean => {
  return ['www.youtube.com', 'youtu.be'].includes(url.hostname);
};

/**
 * YouTube のリンクを整形し、www.youtube.com/watch?v=... を youtu.be/... の形にする
 * @param url 整形する URL
 * @returns 有効でない場合は null それ以外は整形できれば整形して返す
 */
export const parseYoutubeUrl = (url: URL): URL | null => {
  if (!isYouTubeURL(url)) {
    return null;
  }
  if (url.hostname === 'www.youtube.com') {
    if (url.pathname === '/watch') {
      const params = url.searchParams;
      if (params.get('v') === null) {
        return null;
      }
      return new URL(`https://youtu.be/${params.get('v')}`);
    }
    return null;
  } else {
    return new URL(`https://youtu.be${url.pathname}`);
  }
};

/**
 * 「重複がないかを調べ、ないならば少し整形する」関数を返す
 * @param musics 音楽のクロージャ
 * @returns 「重複がないかを調べ、ないならば少し整形する」関数
 */
export const makeParseValidUrlFunc = (musics: MusicsClosure) => (
  urlString: string
):
  | string
  | {
      idx: number;
      val: MusicElement;
    } => {
  try {
    const newUrl = new URL(urlString);
    const sames = Array.from(musics.val().entries())
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, val]) => {
        try {
          const url = new URL(val.url);
          if (isYouTubeURL(newUrl) && isYouTubeURL(url)) {
            if (
              parseYoutubeUrl(newUrl) !== null &&
              // Object の比較は参照で比較されるので、string で比較する (parse 後なので string でも比較できる)
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              parseYoutubeUrl(newUrl)!.href === parseYoutubeUrl(url)!.href
            ) {
              return true;
            }
            return false;
          } else if (!isYouTubeURL(newUrl) && !isYouTubeURL(url)) {
            if (newUrl === url) {
              return true;
            }
            return false;
          }
          return false;
        } catch (err) {
          return false;
        }
      });

    if (sames.length > 0) {
      return {
        idx: sames[0][0],
        val: musics.val()[sames[0][0]],
      };
    }
    return isYouTubeURL(newUrl) && parseYoutubeUrl(newUrl) !== null
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        parseYoutubeUrl(newUrl)!.href
      : urlString;
  } catch (err) {
    return urlString;
  }
};
