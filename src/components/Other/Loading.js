import loadingGif from "../../resources/loading.gif";

function Loading({ show }) {
  return (
    <img
      src={loadingGif}
      alt="loading"
      width="100px"
      height="100px"
      style={{
        display: show ? "" : "none",
        justifySelf: "center",
        alignSelf: "center",
      }}
    ></img>
  );
}

export default Loading;
