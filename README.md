This is a proof of concept for a paper doll app in Famo.us

The first working iteration 0.0.1 now lives as index2.js and uses OutfitView to manually create all the outfits.
OutfitView is no longer in use but if you rename the index files you can see how it works.
If you click the dotted blouse or the green skirt and they will float to the model using a Transitionable.

The current iteration 0.0.2 uses creates the outfits as instances of TopView, PantsView and DressView via json data.

Todo:
Debug eventInput, eventOutput, subscribe, emit.

Write class prototype methods so that whatever is selected will float to the model.

Time permitting, I will add a few bounce animations and a few other fun details.
