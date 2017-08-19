DIST=dist
BASE=flowplayer.viewport-autoplay
GIT_DESC=${shell git rev-parse HEAD }

min:
	@ mkdir -p $(DIST)
	@ sed -e 's/\$$GIT_DESC\$$/$(GIT_DESC)/' $(BASE).js | uglifyjs -m -c --comments '/Flowplayer Drive Oy/' -o dist/flowplayer.viewport-autoplay.min.js

dist: clean min
	@ sed -e 's/\$$GIT_DESC\$$/$(GIT_DESC)/' $(BASE).js > $(DIST)/$(BASE).js
	@ cp LICENSE.md $(DIST)/
	@ cp *.css $(DIST)/
	@ cp *.html $(DIST)/

clean:
	@ rm -rf $(DIST)

deps:
	@ npm install
