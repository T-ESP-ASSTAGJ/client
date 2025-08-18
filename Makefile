.PHONY: help
help:
	@echo "Makefile for client projects"
	@echo "Available targets:"
	@echo "  install - Install dependencies for client projects"
	@echo "  start   - Start client projects with a choice of versions"
	@echo "  build_web_staging - Build the web version of the project for staging"
	@echo "  build_web_production - Build the web version of the project for production"

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
	@echo "Building web version with Docker"
	@docker build -f docker/web/Dockerfile.staging -t jamly_web:staging .
	@echo "Web version built successfully"

.PHONY: build_web_production
build_web_production:
	@echo "Building web version with Docker"
	@docker build -f docker/web/Dockerfile.production -t jamly_web:production .
	@echo "Web version built successfully"