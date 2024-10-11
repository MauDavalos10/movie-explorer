import React from "react";
import { Box, Toolbar, AppBar, Typography, Button, Modal } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MovieCard from "./MovieCard";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
      <Modal open={open} onClose={handleClose}>
        <div className="flex items-center md:h-full">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            slidesPerView={1}
            watchOverflow={true}
          >
            {favorites.map((favoriteMovie) => (
              <SwiperSlide
                className="flex justify-center"
                key={favoriteMovie.imdbID}
              >
                <MovieCard movie={favoriteMovie} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute left-1/2 top-10 transform -translate-x-1/2">
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-transparent bg-clip-text shadow-md shadow-gray-500">
              {favorites.length > 0
                ? "Press [Esc] to exit Favorite View"
                : "No Favorite movies added"}
            </p>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default Header;
