import styled from 'styled-components';

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.7);

  .board {
    background-color: #333;
    color: #f0f0f0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 4rem;
    letter-spacing: 0.1rem;
    padding: 20px 40px;
    border-radius: 10px;
    animation: vertically-flowing 2s infinite;
  }
  .shadow {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border-radius: 50%;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    animation: shadow 2s infinite;
  }

  @keyframes vertically-flowing {
    0%,
    100% {
      top: 50%;
    }
    50% {
      top: calc(50% - 30px);
    }
  }

  @keyframes shadow {
    50% {
      width: 520px;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export default function LoadingScreen() {
  return (
    <Loading>
      <div className="board">Loading</div>
      <div className="shadow"></div>
    </Loading>
  );
}
