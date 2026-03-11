.PHONY: list clean test lint format build start prod

ROOT_DIR := $(realpath .)

list:
	@awk -F: '/^[A-z]/ {print $$1}' Makefile | sort

clean:
	rm -r "${ROOT_DIR}/dist" > /dev/null 2>&1

test:
	node --test "${ROOT_DIR}/tests/"

lint:
	npx eslint "${ROOT_DIR}"

format:
	npx eslint --fix "${ROOT_DIR}"

build:
	BUILD_ENV=production npx eleventy

dev:
	npx eleventy --serve --incremental

start: dev

prod: clean build
	python -m http.server --directory "${ROOT_DIR}/dist"

deploy:
	"${ROOT_DIR}/scripts/deploy.sh"
