import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Input } from "@chakra-ui/react";

function App() {
  const [file, setFile] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const inputImageRef = useRef<any>(null)

  const openFileDialog = () => {
    inputImageRef.current && inputImageRef.current.click()
  }

  const loadImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if (!files?.length) return;

    const fileListToArray = [...Array.from(files!)]
    setFile(fileListToArray)
  }


  useEffect(() => {
    const tempUrlImage: string[] = [];

    for (const image of file) {
      tempUrlImage.push(URL.createObjectURL(image))
    }

    setPreviewImage(tempUrlImage);

  }, [file])


  const deleteImagePreview = (positionOfImagePreview: number) => {
    const copyOfFile = [...file];
    const filteredFile = copyOfFile.filter((_, index) => index !== positionOfImagePreview);
    setFile(filteredFile)

  }

 
  return (
    <Box bgColor='gray.200' minH='100vh'>
      <Container maxW='container.lg'>
        <Input ref={inputImageRef} display='none' type="file" onChange={loadImage} multiple />
        <Button onClick={openFileDialog} >Subir Imagen</Button>
        {
          previewImage && previewImage.map((url, index) => (
            <Box key={index} onClick={() => deleteImagePreview(index)}>
              <img src={url} alt="previewImage" />
            </Box>
          ))
        }
      </Container>
    </Box>
  );
}

export default App;
