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