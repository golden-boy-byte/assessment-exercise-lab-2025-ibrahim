import { TextField, Button, Paper } from "@mui/material";
import { useRef } from "react";

interface FiltersProps {
  onSearch: (name: string, email: string) => void;
  onExport: () => void;
}

const Filters: React.FC<FiltersProps> = (props) => {
  const { onExport, onSearch } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(nameRef.current?.value ?? "", emailRef.current?.value ?? "");
        }}
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <TextField
          inputRef={nameRef}
          label="Name"
          variant="outlined"
          size="small"
        />
        <TextField
          inputRef={emailRef}
          label="Email"
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
        <Button onClick={onExport} variant="outlined">
          Export XML
        </Button>
      </form>
    </Paper>
  );
};

export default Filters;
