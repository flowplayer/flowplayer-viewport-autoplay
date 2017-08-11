DIST=dist
BASE=flowplayer.skeleton
GIT_DESC=${shell git describe }

min:
	@ mkdir -p $(DIST)
	@ sed -e 's/\$$GIT_DESC\$$/$(GIT_DESC)/' $(BASE).js | uglifyjs -m -c --comments '/Flowplayer Drive Oy/' -o dist/flowplayer.skeleton.min.js

dist: min
	@ sed -e 's/\$$GIT_DESC\$$/$(GIT_DESC)/' $(BASE).js > $(DIST)/$(BASE).js
	@ cp LICENSE.md $(DIST)/

clean:
	@ rm -rf $(DIST)

deps:
	@ npm install
