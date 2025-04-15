.PHONY: help serve clean new-post

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "    \033[36m%-15s\033[0m \t%s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

serve: ## start a local development server
	@echo "starting local server at http://localhost:8000"
	@python3 -m http.server 8000

new-post: ## create a new blog post template
	@read -p "enter post title: " title; \
	slug=`echo $$title | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g'`; \
	date=`date +%Y-%m-%d`; \
	filepath="posts/$$date-$$slug.md"; \
	mkdir -p posts; \
	echo "creating $$filepath"; \
	echo "# $$title" > $$filepath; \
	echo "" >> $$filepath; \
	echo "date: $$date" >> $$filepath; \
	echo "" >> $$filepath; \
	echo "write your post here." >> $$filepath; \
	echo "" >> $$filepath; \
	echo "done! new post created at $$filepath"; \
	echo "add to script.js:"; \
	echo "  {file: '$$date-$$slug.md', title: '$$title', date: '$$date'}"

clean: ## clean temporary files
	@echo "cleaning temporary files..."
	@find . -name "*.tmp" -type f -delete
	@find . -name "*~" -type f -delete
	@echo "done!"
