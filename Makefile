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
	@echo "3) Cancel"
	@read -p "Enter your choice [1-3]: " choice; \
	case "$$choice" in \
		1 ) pnpm dev:web ;; \
		2 ) pnpm dev:client ;; \
		3 ) echo "Cancelled." ;; \
		* ) echo "Invalid choice. Starting default..." && pnpm dev ;; \
	esac