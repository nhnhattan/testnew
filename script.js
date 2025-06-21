let myWheel;

// Hàm khởi tạo vòng quay
function createWheel() {
  const numSegments = 8; // Số lượng phần trong vòng quay
  const segmentAngle = 360 / numSegments;
  const segments = [
    {
      image: "./sm_5b31efc89fdc6.jpg",
      text: "Giải 1",
      fillStyle: "#FF0000",
      textFillStyle: "#FFFFFF",
    },
    {
      image: "https://via.placeholder.com/50/FF5722/FFFFFF?text=Gift2",
      text: "Giải 2",
      fillStyle: "#FFFFFF",
      textFillStyle: "#FF0000",
    },
    {
      image: "https://via.placeholder.com/50/4CAF50/FFFFFF?text=Gift3",
      text: "Giải 3",
      fillStyle: "#FF0000",
      textFillStyle: "#FFFFFF",
    },
    {
      image: "https://via.placeholder.com/50/2196F3/FFFFFF?text=Gift4",
      text: "Giải 4",
      fillStyle: "#FFFFFF",
      textFillStyle: "#FF0000",
    },
    {
      image: "https://via.placeholder.com/50/9C27B0/FFFFFF?text=Gift5",
      text: "Giải 5",
      fillStyle: "#FF0000",
      textFillStyle: "#FFFFFF",
    },
    {
      image: "https://via.placeholder.com/50/FFC107/FFFFFF?text=Gift6",
      text: "Giải 6",
      fillStyle: "#FFFFFF",
      textFillStyle: "#FF0000",
    },
    {
      image: "https://via.placeholder.com/50/607D8B/FFFFFF?text=Gift7",
      text: "Giải 7",
      fillStyle: "#FF0000",
      textFillStyle: "#FFFFFF",
    },
    {
      image: "https://via.placeholder.com/50/795548/FFFFFF?text=Gift8",
      text: "Giải 8",
      fillStyle: "#FFFFFF",
      textFillStyle: "#FF0000",
    },
  ];

  // Thêm các phần vào vòng quay, sử dụng fillStyle để chỉ định màu đỏ hoặc trắng và textFillStyle để thay đổi màu chữ
  const segmentsConfig = segments.map((segment) => ({
    fillStyle: segment.fillStyle,
    textFillStyle: segment.textFillStyle,
    text: segment.text,
    image: new Image(),
  }));

  // Tải hình ảnh vào các phân khúc
  segments.forEach((segment, index) => {
    const img = new Image();
    img.src = segment.image;
    img.onload = () => {
      segmentsConfig[index].image = img; // Gán hình ảnh đã tải vào segment
      myWheel.draw(); // Vẽ lại vòng quay khi hình ảnh đã tải xong
    };
  });

  // Tạo vòng quay
  return new Winwheel({
    canvasId: "myCanvas",
    numSegments: numSegments,
    segments: segmentsConfig,
    animation: {
      type: "spinToStop",
      duration: 5,
      spins: 8,
      easing: "Power3.easeOut",
      callbackFinished: alertPrize,
      callbackFinished: (indicatedSegment) => {
        alignPointer(indicatedSegment, segmentAngle); // Căn chỉnh mũi tên
        alertPrize(indicatedSegment); // Hiển thị kết quả
      },
    },
  });
}

function alignPointer(indicatedSegment, segmentAngle) {
  // Tìm chỉ số của ô trúng thưởng
  const segmentIndex = myWheel.segments.findIndex(
    (segment) => segment && segment.text === indicatedSegment.text
  );

  if (segmentIndex > 0) {
    // Tính góc trung tâm của ô được chọn
    const targetAngle =
      (segmentIndex - 1) * segmentAngle + segmentAngle / 2 + 0.1; // Thêm offset nhỏ
    const currentAngle = myWheel.rotationAngle % 360;
    const adjustment = targetAngle - currentAngle;

    // Căn chỉnh lại góc
    myWheel.rotationAngle += adjustment;
    myWheel.draw();
  }
}

// Hàm xử lý sau khi quay xong
function alertPrize(indicatedSegment) {
  document.getElementById("prize-text").textContent = indicatedSegment.text;
  document.getElementById("popup").style.display = "block"; // Hiển thị popup
}

// Đóng popup
function closePopup() {
  document.getElementById("popup").style.display = "none"; // Ẩn popup
}

// Sự kiện click nút quay
document.getElementById("spin-button").addEventListener("click", () => {
  if (!myWheel) {
    myWheel = createWheel(); // Chỉ tạo vòng quay nếu chưa có
  } else {
    myWheel.stopAnimation(false); // Dừng vòng quay nếu đang quay
    myWheel.rotationAngle = 0; // Reset vòng quay về vị trí ban đầu
    myWheel.draw(); // Vẽ lại vòng quay
  }
  myWheel.startAnimation(); // Bắt đầu quay vòng quay
});

// Tạo vòng quay ban đầu khi trang tải
window.onload = () => {
  myWheel = createWheel(); // Tạo vòng quay ban đầu
};
