import torch
from torch import nn
from torchvision import models, transforms
from PIL import Image
import os
import json

# Paths
model_path = "D:/OOPS Project/ayushman/ML Model/pth_files/mango_classifier.pth"
test_img_path = "D:/OOPS Project/ayushman/ML Model/test_inferences/infer3.jpg"

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

with open("json_files/mango_classnames.json") as f:
    class_names = json.load(f)

# Load model
model = models.resnet18(pretrained=False)  # no pretrained, structure only
num_classes = len(class_names)
model.fc = nn.Linear(model.fc.in_features, num_classes)

model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

# Prediction function
def predict_image(img_path):
    img = Image.open(img_path).convert("RGB")
    img_t = transform(img).unsqueeze(0).to(device)  # add batch dim
    with torch.no_grad():
        outputs = model(img_t)
        _, pred = torch.max(outputs, 1)
    return class_names[pred.item()]

# Run prediction
predicted_class = predict_image(test_img_path)
print(f"Predicted class: {predicted_class}")
