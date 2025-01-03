import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../css/RecipeCard.css";
import { IoHeartCircleOutline } from "react-icons/io5";
import { tokenToId } from "../API/api";
import { parseIngredients, parseInstructions, parseImageUrls } from "../utils/regex";


function RecipeCard({
  recipeId,
  title,
  calories,
  ingredients,
  instructions,
  image,
}) {
  const [flipped, setFlipped] = useState(false);
  const [message, setMessage] = useState("");

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    console.log("Heart button clicked! Recipe ID:", recipeId);
    console.log("UserId: ", tokenToId());
  };

  const ingredientList = parseIngredients(ingredients);
  const instructionList = parseInstructions(instructions);
  const imageUrls = parseImageUrls(image);
  const firstImage = imageUrls[0];

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        onClick={handleCardClick}
        style={{
          width: "20rem",
          height: "30rem",
          borderRadius: "10px",
          cursor: "pointer",
          transformStyle: "preserve-3d",
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
            display: "grid",
            gap: "60px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Card.Img
            variant="top"
            src={firstImage}
            alt={title}
            style={{
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px 10px 0 0",
            }}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <strong>Calories:</strong> {calories} kcal
            </Card.Text>
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
              <IoHeartCircleOutline style={{ fontSize: "60px"}} />
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default RecipeCard;
