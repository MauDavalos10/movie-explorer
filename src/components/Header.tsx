import React from "react";
import { Box, Toolbar, AppBar, Typography, Button, Modal } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MovieCard from "./MovieCard";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
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
        <div className="flex items-center h-full md:h-full">
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
          <div className="absolute left-1/2 top-20 transform -translate-x-1/2">
            <span className="flex bg-[#3b3b3b] gap-2 rounded-md p-2 items-center">
              <p className="text-lg md:text-sm text-yellow-400">
                {favorites.length > 0
                  ? "Favorite View"
                  : "No Favorite movies added"}
              </p>
              <button onClick={handleClose}>
                <DisabledByDefaultIcon
                  fontSize={"large"}
                  className="text-yellow-400"
                />
              </button>
            </span>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default Header;
