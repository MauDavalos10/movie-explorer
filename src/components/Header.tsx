import React from "react";
import { Box, Toolbar, AppBar, Typography, Button, Modal } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MovieCard from "./MovieCard";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const favorites = useSelector((state: RootState) => state.favoriteMovie);

  return (
    <Box className="grow">
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#3b3b3b" }}>
          <MovieIcon sx={{ color: "#efbf04", marginRight: "1rem" }} />
          <Typography
            sx={{ color: "#efbf04", flexGrow: 1 }}
            variant="h6"
            component="div"
            className="grow"
          >
            Movie Explorer
          </Typography>
          <Button onClick={handleOpen} sx={{ color: "#efbf04" }}>
            My favorites
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex bg-pink-400">
          <Swiper>
            {favorites.map((favoriteMovie) => (
              <SwiperSlide className="bg-blue-300" key={favoriteMovie.imdbID}>
                <MovieCard movie={favoriteMovie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Modal>
    </Box>
  );
};

export default Header;
