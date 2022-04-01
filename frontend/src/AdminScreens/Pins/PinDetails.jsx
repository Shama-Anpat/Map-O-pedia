// import MainScreen from "../../components/MainScreen";
// import { useAlert } from "react-alert";

// import ReviewCard from "./ReviewCard";

// import {
//   clearErrors,
//   getPinDetails,
//   newReview,
// } from "../../actions/pinsActions.jsx";
// import { NEW_REVIEW_RESET } from "../../constants/pinsConstants";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";

// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";

// const PinDetails = ({ match }) => {
//   const alert = useAlert();

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

//   const options = {
//     size: "large",
//     value: pins.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   // const increaseQuantity = () => {
//   //   if (product.Stock <= quantity) return;

//   //   const qty = quantity + 1;
//   //   setQuantity(qty);
//   // };

//   // const decreaseQuantity = () => {
//   //   if (1 >= quantity) return;

//   //   const qty = quantity - 1;
//   //   setQuantity(qty);
//   // };

//   // const addToCartHandler = () => {
//   //   dispatch(addItemsToCart(match.params.id, quantity));
//   //   alert.success("Item Added To Cart");
//   // };

//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("pinId", match.params.id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (reviewError) {
//       alert.error(reviewError);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Review Submitted Successfully");
//       dispatch({ type: NEW_REVIEW_RESET });
//     }
//     dispatch(getPinDetails(match.params.id));
//   }, [dispatch, match.params.id, error, alert, reviewError, success]);

//   return (
//     <MainScreen title={`${pins.place}`}>
//       {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
//       {loading && <Loading />}
//       <div className="ProductDetails">
//         <div>
//           <Carousel>
//             {pins.images &&
//               pins.images.map((item, i) => (
//                 <img
//                   className="CarouselImage"
//                   key={i}
//                   src={item.url}
//                   alt={`${i} Slide`}
//                 />
//               ))}
//           </Carousel>
//         </div>

//         <div>
//           <div className="detailsBlock-1">
//             <h2>{pins.place}</h2>
//             <p>Pin # {pins._id}</p>
//           </div>
//           <div className="detailsBlock-2">
//             <AiTwotoneStar {...options} />
//             <span className="detailsBlock-2-span">
//               {" "}
//               ({pins.numOfReviews} Reviews)
//             </span>
//           </div>

//           <div className="detailsBlock-4">
//             Description : <p>{pins.desc}</p>
//           </div>

//           <button onClick={submitReviewToggle} className="submitReview">
//             Submit Review
//           </button>
//         </div>
//       </div>

//       <h3 className="reviewsHeading">REVIEWS</h3>

//       <Dialog
//         aria-labelledby="simple-dialog-title"
//         open={open}
//         onClose={submitReviewToggle}
//       >
//         <DialogTitle>Submit Review</DialogTitle>
//         <DialogContent className="submitDialog">
//           <AiTwotoneStar
//             onChange={(e) => setRating(e.target.value)}
//             value={rating}
//             size="large"
//           />

//           <textarea
//             className="submitDialogTextArea"
//             cols="30"
//             rows="5"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           ></textarea>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={submitReviewToggle} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={reviewSubmitHandler} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {pins.reviews && pins.reviews[0] ? (
//         <div className="reviews">
//           {pins.reviews &&
//             pins.reviews.map((review) => (
//               <ReviewCard key={review._id} review={review} />
//             ))}
//         </div>
//       ) : (
//         <p className="noReviews">No Reviews Yet</p>
//       )}
//     </MainScreen>
//   );
// };

// export default PinDetails;

import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import Rating from "@mui/material/Rating";
import ReviewCard from "./ReviewCard";
import {
  clearErrors,
  getPinDetails,
  newReview,
} from "../../actions/pinsActions.jsx";
import { NEW_REVIEW_RESET } from "../../constants/pinsConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import "./PinDetails.css";

const PinDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { pin, loading, error } = useSelector((state) => state.pinDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: pin.ratings || null,
    readOnly: true,
    precision: 0.5,
  };
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("pinId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getPinDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <div className="mainpindetails">
      <MainScreen title={`${pin.place}`}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <div className="PinDetails">
          <div>
            <Carousel>
              {pin.images &&
                pin.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i}Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>Created by ~ {pin.username}</h2>
            </div>
            <div className="detailsBlock-3">
              <h4>
                Latitude : {pin.lat}
                <br></br>
                Longitude : {pin.long}
              </h4>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />{" "}
              <span className="detailsBlock-2-span">
                ({pin.numOfReviews} Reviews){" "}
              </span>{" "}
            </div>
            <div className="detailsBlock-4">
              Description : <p>{pin.desc}</p>{" "}
            </div>{" "}
            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review{" "}
            </button>
          </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {pin.reviews && pin.reviews[0] ? (
          <div className="reviews">
            {pin.reviews &&
              pin.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </MainScreen>
    </div>
  );
};

export default PinDetails;
