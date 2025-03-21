import React, { useState } from "react";
import { Card, Toast, ToastContainer } from "react-bootstrap";
import "../css/RecipeCard.css";
import { IoHeartCircleOutline } from "react-icons/io5";
import { addFavoriteRecipes } from "../API/api";
import {
  parseIngredients,
  parseInstructions,
  parseImageUrls,
  convertCookingTime,
} from "../utils/regex";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


function RecipeCard({
  recipeId,
  title,
  calories,
  ingredients,
  instructions,
  cookTime,
  image,
  avgRate
}) {
  const [flipped, setFlipped] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    console.log("Heart button clicked! Recipe ID:", recipeId);
    try {
      const response = await addFavoriteRecipes(recipeId);
      if (response && response.message) {
        setMessage(response.message);
      } else {
        setMessage(`${title} added to favorites!`);
      }
    } catch (error) {
      console.error(`${error}`);
      setMessage("An error occurred while removing the recipe.");
    }
    setShowToast(true);
  };

  const ingredientList = parseIngredients(ingredients);
  const instructionList = parseInstructions(instructions);
  const imageUrls = parseImageUrls(image);
  const firstImage = imageUrls[0];
  const cookTimes = convertCookingTime(cookTime);

  return (
    <div>
      <ToastContainer position="bottom-start" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          style={{ backgroundColor: "#3f2fee", color: "white" }}
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div style={{ perspective: "1000px", position: "relative" }}>
        <div
          onClick={handleCardClick}
          style={{
            width: "20rem",
            height: "30rem",
            borderRadius: "10px",
            cursor: "pointer",
            transformStyle: "preserve-3d",
            marginBottom: "7rem",
            transition: "transform 0.6s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <Card
            className="text-center"
            style={{
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "10px",
              display: "flex",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <Card.Img
              variant="top"
              src={firstImage}
              alt={title}
              style={{
                height: "230px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
              }}
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                <strong>Calories:</strong> {calories} kcal
              </Card.Text>
              <div className="d-flex justify-content-center mb-5">
                <div className="text-center mb-2">
                  <div className="rating d-flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < avgRate ? (
                          <FaStar color="gold" size={20} />
                        ) : (
                          <CiStar color="gray" size={20} />
                        )}
                      </span>
                    )).reverse()}
                  </div>
                </div>
              </div>
              <button
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleHeartClick}
              >
                <IoHeartCircleOutline style={{ fontSize: "60px" }} />
              </button>
            </Card.Body>
          </Card>
          <Card
            className="text-center"
            style={{
              height: "100%",
              backfaceVisibility: "hidden",
              position: "absolute",
              top: "0",
              transform: "rotateY(180deg)",
              borderRadius: "10px",
              overflowY: "auto",
            }}
          >
            <Card.Body className="card-body">
              <Card.Title>Ingredients</Card.Title>
              <ul style={{ textAlign: "left" }}>
                {ingredientList.map((ingredient, index) => (
                  <li
                    style={{
                      listStyleType: "none",
                    }}
                    key={index}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              <Card.Title>Instructions</Card.Title>
              <ol style={{ textAlign: "left" }}>
                {instructionList.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              <p>
                <b className="mt-4">Cook Time: </b>
                {cookTimes}
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
