.PHONY: list start

list:
	@awk -F: '/^[A-z]/ {print $$1}' Makefile | sort

start:
	python -m http.server --directory "./public"
