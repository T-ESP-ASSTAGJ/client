# Variables pour les labels Docker
VERSION := $(shell git describe --tags --always 2>/dev/null || echo "v0.0.0")
GIT_COMMIT := $(shell git rev-parse HEAD 2>/dev/null || echo "unknown")
BUILD_DATE := $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
ECR_REGISTRY := ghcr.io
SERVICE_NAME := website

.PHONY: help
help:
	@echo "Makefile for client projects"
	@echo "Available targets:"
	@echo "  install - Install dependencies for client projects"
	@echo "  start   - Start client projects with a choice of versions"
	@echo "  build_web_staging - Build the web version of the project for staging"
	@echo "  build_web_production - Build the web version of the project for production"
	@echo "  push_web_staging - Push the staging image to GitHub Container Registry"
	@echo "  push_web_production - Push the production image to GitHub Container Registry"
	@echo ""
	@echo "Docker build info:"
	@echo "  Version: $(VERSION)"
	@echo "  Commit: $(shell echo $(GIT_COMMIT) | cut -c1-8)"
	@echo "  Build Date: $(BUILD_DATE)"

.PHONY: install
install:
	@echo "Installing dependencies for client projects"
	@pnpm install

.PHONY: start
start:
	@echo "Starting client projects"
	@echo "Choose which version to start:"
	@echo "1) Web version (dev:web)"
	@echo "2) Client version (dev:client)"
	@echo "3) Docs version (dev:docs)"
	@echo "4) Cancel"
	@read -p "Enter your choice [1-4]: " choice; \
	case "$$choice" in \
	   1 ) pnpm dev:web ;; \
	   2 ) pnpm dev:client ;; \
	   3 ) pnpm dev:docs ;; \
	   4 ) echo "Cancelled." ;; \
	   * ) echo "Invalid choice. Starting default..." && pnpm dev ;; \
	esac

.PHONY: build_web_staging
build_web_staging:
	@echo "🏗️  Building web version for STAGING with Docker labels"
	@echo "   Version: $(VERSION)"
	@echo "   Commit: $(shell echo $(GIT_COMMIT) | cut -c1-8)"
	@echo "   Build Date: $(BUILD_DATE)"
	@docker build \
		--build-arg VERSION="$(VERSION)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg ENVIRONMENT="staging" \
		--file docker/web/Dockerfile.staging \
		--tag "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging" \
		--tag "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging-$(VERSION)" \
		--tag "t-esp-asstagj_web:staging" \
		.
	@echo "✅ Web staging version built successfully"
	@echo "📋 Tags created:"
	@echo "   - $(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging"
	@echo "   - $(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging-$(VERSION)"
	@echo "   - t-esp-asstagj_web:staging"

.PHONY: build_web_production
build_web_production:
	@echo "🏗️  Building web version for PRODUCTION with Docker labels"
	@echo "   Version: $(VERSION)"
	@echo "   Commit: $(shell echo $(GIT_COMMIT) | cut -c1-8)"
	@echo "   Build Date: $(BUILD_DATE)"
	@docker build \
		--build-arg VERSION="$(VERSION)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg ENVIRONMENT="production" \
		--file docker/web/Dockerfile.production \
		--tag "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):latest" \
		--tag "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):$(VERSION)" \
		--tag "t-esp-asstagj_web:production" \
		.
	@echo "✅ Web production version built successfully"
	@echo "📋 Tags created:"
	@echo "   - $(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):latest"
	@echo "   - $(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):$(VERSION)"
	@echo "   - t-esp-asstagj_web:production"

.PHONY: push_web_staging
push_web_staging: build_web_staging
	@echo "📤 Pushing staging image to GitHub Container Registry..."
	@docker push "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging"
	@docker push "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):staging-$(VERSION)"
	@echo "✅ Staging image pushed successfully"

.PHONY: push_web_production
push_web_production: build_web_production
	@echo "📤 Pushing production image to GitHub Container Registry..."
	@docker push "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):latest"
	@docker push "$(ECR_REGISTRY)/t-esp-asstagj/$(SERVICE_NAME):$(VERSION)"
	@echo "✅ Production image pushed successfully"