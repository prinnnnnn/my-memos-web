gen:
	@echo "Generating OpenAPI client..."
	npx openapi-typescript-codegen --input docs/api.yml --output ./generated/ --client axios
	@echo "OpenAPI client generated."

find-unused:
	@echo "Finding unused files..."
	@npx ts-prune | grep --color=auto default
	@echo "Unused files check complete."

build-images:
	@docker buildx build --platform linux/amd64 -t prinnnnnn/memos-dashboard:$(TAG) . --load

.PHONY: gen find-unused
