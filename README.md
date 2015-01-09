January 6, 2015. Proof of concept for a paper doll app in Famo.us using the famous browserify seed.

I am an instructor for the School of Web Design + New Media at the Academy of Art University in San Francisco. When I was invited to participate in a class at Famo.us Labs, I decided to build a typical mood-board-type app, where the user can rearrange images in front of a background image.
The illustrations for this project were created by one of my studetns, Jia Jiang, and used by permission, all rights reserved.

January 7. The first working iteration 0.0.1 now lives as index2.js and uses OutfitView to manually create all the outfits in a single view. The advantage of this approach is that every surface is created in a single view. The problem is that it isn't scalable. Each surface has a modifier and if I wanted the whole thing to work, each surface would need its own transitionable, as well. OutfitView is no longer in use but if you rename the index files you can see how it worked. Only the dotted blouse and the green skirt have a Transitionable.

January 8. As of iteration 0.0.2, I create each ClothesView object as instances of TopView, PantsView and DressView via JSON data, depending on what I want to do with them. I presented this version the famo.us demo night.

January 9, 2015
If you want to control surface alignment, you either need to give them all the same align values and place them with origin, or vice versa. I started by setting the origin of every surface to [0.5, 0], which means surfaces were positioned from the midpoint of the total x-value (width), along the top of the surface. (Think: coat hanger.)
This let everything scale from left-to-right, but the design would break along the vertical axis. In other words, when you resize your window to be smaller from top to bottom, the clothes would no longer align to the model's body.

The current solution is that I repositioned all of the surfaces relative to the center of the entire view 'align': [0.5, 0.5], using origin for relative placement.
This solves two problems: The clothes are now sticky to the proper point on the model's body, regardless of screen size. Furthermore, I positioned each article of clothing so that they do not overlap the background view. This gives the user the ability to capture a screenshot of the selected outfit.
The problem is, the view no longer scales to narrow devices. I will address this in the future.

I have also changed the ModelView's clothesIndex from an array to a javascript object. This will allow me to fire additional events based on what the model is wearing.

MORE SOON!



