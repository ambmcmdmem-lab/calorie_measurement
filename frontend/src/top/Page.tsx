import styled from 'styled-components';
import usePageLogic from './usePageLogic';
import ButtonWithLink from '../component/button/ButtonWithLink';

const Page = styled.div`
  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .body {
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
  }

  .input {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 5px 10px;
  }
  .input:not(:first-child) {
    margin-top: 10px;
  }

  .button-wrap {
    margin-top: 40px;
    text-align: center;
  }

  .error {
    background-color: pink;
    border-radius: 10px;
    padding: 10px 20px;
    color: #333;
    margin-top: 10px;
  }
  .error::before {
    content: '！';
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  }
`;

export default function TopPage() {
  const {
    foodInputsSortedById,
    error,
    onInputFood,
    paramsForResult,
    validateLinkToResult,
  } = usePageLogic();

  return (
    <Page>
      <h1 className="title">カロリー測定()</h1>

      <div className="body">
        <div className="inputs">
          {foodInputsSortedById.map(({ id, name }) => (
            <input
              className="input"
              value={name}
              key={id}
              onInput={onInputFood(id)}
              placeholder="カロリーを測定したい食べ物・飲み物"
            />
          ))}
        </div>

        {error && <div className="error">{error}</div>}

        <div className="button-wrap">
          <ButtonWithLink
            onClick={validateLinkToResult}
            to={{ pathname: '/result', search: paramsForResult }}
            backgroundColor="#4444f0"
          >
            カロリー測定()をする！
          </ButtonWithLink>
        </div>
      </div>
    </Page>
  );
}
