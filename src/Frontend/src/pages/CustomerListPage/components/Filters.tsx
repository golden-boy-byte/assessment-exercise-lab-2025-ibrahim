import { TextField, Box, Button } from "@mui/material";
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
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(nameRef.current?.value ?? "", emailRef.current?.value ?? "");
      }}
      sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}
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
    </Box>
  );
};

export default Filters;
