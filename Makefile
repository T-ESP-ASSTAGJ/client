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

.PHONY: install
install:
	@echo "Installing dependencies for client projects"
	@pnpm expo install

.PHONY: start
start:
	@echo "Starting client projects"
	@echo "Choose which version to start:"
	@echo "1) Client version (dev:client)"
	@echo "2) Docs version (dev:docs)"
	@echo "3) Cancel"
	@read -p "Enter your choice [1-3]: " choice; \
	case "$$choice" in \
	   1 ) pnpm dev:client ;; \
	   2 ) pnpm dev:docs ;; \
	   3 ) echo "Cancelled." ;; \
	   * ) echo "Invalid choice. Starting default..." && pnpm dev ;; \
	esac