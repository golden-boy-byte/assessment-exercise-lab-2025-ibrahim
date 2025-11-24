import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

interface LoaderProps {
  isActive: boolean;
}

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
});

const Loader: React.FC<LoaderProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <Overlay>
      <CircularProgress size={60} />
    </Overlay>
  );
};

export default Loader;
