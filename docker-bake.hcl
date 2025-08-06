group "default" {
  targets = ["backend", "frontend"]
}

target "frontend" {
  dockerfile = "apps/frontend/Dockerfile"
  context = "."
  tags = ["urlshortener-frontend:latest"]
}

target "backend" {
  dockerfile = "apps/backend/Dockerfile"
  context = "."
  tags = ["urlshortener-backend:latest"]
}