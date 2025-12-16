import styled from 'styled-components';
import usePageLogic from './usePageLogic';
import ButtonWithLink from '../component/button/ButtonWithLink';

type Props = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const Page = styled.div`
  .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  .title .emphasis {
    font-size: 4.5rem;
    margin-left: 20px;
    margin-right: 20px;
  }

  .list-wrap {
    background: #fff;
    max-width: 800px;
    margin: 20px auto 0;
    border-radius: 10px;
    padding: 20px 0;
  }

  .list {
    margin: 0 auto;
    max-width: 600px;
  }

  .list .item {
    font-size: 2rem;
  }

  .buttons {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    column-gap: 40px;
  }

  .buttons > .button {
    width: 220px;
  }
`;

export default function ResultPage({
  isLoading,
  startLoading,
  stopLoading,
}: Props) {
  const { reasons } = usePageLogic(startLoading, stopLoading);

  return (
    <Page>
      {isLoading || (
        <div className="title">
          合計は、<span className="emphasis">0</span>カロリーでした！
        </div>
      )}

      <div className="list-wrap">
        <ul className="list">
          {reasons.map((reason, index) => (
            <li className="item" key={index}>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <ButtonWithLink className="button" backgroundColor="gray" to="/">
          戻る
        </ButtonWithLink>
        <ButtonWithLink
          className="button"
          to={`http://twitter.com/share?url=${window.location.origin}&text=${reasons.join('\n')}&hashtags=クソアプリ`}
          target="_blank"
          backgroundColor="#000"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '10px',
            }}
          >
            <img src="/static/x_logo.jpg" width="30" alt="" />
            ツイートする
          </div>
        </ButtonWithLink>
      </div>
    </Page>
  );
}
