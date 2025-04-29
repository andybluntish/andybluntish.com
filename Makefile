.PHONY: list clean test lint format build start prod subset_fonts

ROOT_DIR := $(realpath .)

list:
	@awk -F: '/^[A-z]/ {print $$1}' Makefile | sort

clean:
	rm -r "${ROOT_DIR}/dist" > /dev/null 2>&1

test:
	node --test "${ROOT_DIR}/tests/"

lint:
	pnpm eslint "${ROOT_DIR}"

format:
	pnpm eslint --fix "${ROOT_DIR}"

build:
	BUILD_ENV=production pnpm eleventy

dev:
	pnpm eleventy --serve --incremental

start: dev

prod: clean build
	python -m http.server --directory "${ROOT_DIR}/dist"

subset_fonts:
	"${ROOT_DIR}/scripts/subset_fonts.sh"

deploy:
	"${ROOT_DIR}/scripts/deploy.sh"
