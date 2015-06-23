SRC_FILES = $(shell find src -name '*.js')
LIB_FILES = $(patsubst src/%.js, lib/%.js, $(SRC_FILES))

all: lib dist

clean:
	rm -r lib dist

lib: $(SRC_FILES)
	babel --out-dir=lib --source-maps=true --module=umdStrict --stage=0 src
	@touch lib

dist: lib $(LIB_FILES)
	@mkdir -p dist
	browserify lib/index.js -o dist/fd-angular-meta.raw.js --standalone=FdAngularMeta --extension=js --debug
	cat dist/fd-angular-meta.raw.js | exorcist dist/fd-angular-meta.js.map > dist/fd-angular-meta.js
	rm dist/fd-angular-meta.raw.js
	@touch dist

.PHONEY: all clean
