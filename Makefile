gen:
	@echo "Generating OpenAPI client..."
	npx openapi-typescript-codegen --input docs/api.yml --output ./generated/ --client axios
	@echo "OpenAPI client generated."