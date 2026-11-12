# Family Restaurant Image Assets Directory
==================================================

This directory is prepared for future image imports generated through Google Flow or other photography assets.

### Recommended Image File Names and Aspect Ratios:
1. hero-family-dining.jpg (16:9 / 1200x675px) - Homepage Hero
2. interior-dining-hall.jpg (4:3 / 800x600px) - Restaurant Interior Main
3. interior-private-booth.jpg (4:3 / 800x600px) - Cozy Family Seating
4. starters-spring-rolls.jpg (4:3 / 600x450px) - Veg Spring Rolls
5. starters-paneer-tikka.jpg (4:3 / 600x450px) - Tandoori Paneer Tikka
6. starters-crispy-corn.jpg (4:3 / 600x450px) - Crispy Corn
7. starters-chicken-tikka.jpg (4:3 / 600x450px) - Chicken Tikka
8. main-paneer-butter-masala.jpg (4:3 / 600x450px) - Paneer Butter Masala
9. main-dal-tadka.jpg (4:3 / 600x450px) - Dal Tadka
10. main-veg-biryani.jpg (4:3 / 600x450px) - Veg Biryani
11. main-chicken-biryani.jpg (4:3 / 600x450px) - Chicken Biryani
12. main-butter-chicken.jpg (4:3 / 600x450px) - Butter Chicken
13. chinese-fried-rice.jpg (4:3 / 600x450px) - Veg Fried Rice
14. chinese-hakka-noodles.jpg (4:3 / 600x450px) - Hakka Noodles
15. chinese-chilli-paneer.jpg (4:3 / 600x450px) - Chilli Paneer
16. chinese-chicken-manchurian.jpg (4:3 / 600x450px) - Chicken Manchurian
17. pizza-margherita.jpg (4:3 / 600x450px) - Margherita Pizza
18. pizza-farmhouse.jpg (4:3 / 600x450px) - Farmhouse Pizza
19. pasta-white-sauce.jpg (4:3 / 600x450px) - White Sauce Pasta
20. pasta-red-sauce.jpg (4:3 / 600x450px) - Red Sauce Pasta
21. dessert-brownie.jpg (4:3 / 600x450px) - Chocolate Brownie
22. dessert-vanilla-icecream.jpg (4:3 / 600x450px) - Vanilla Ice Cream
23. dessert-gulab-jamun.jpg (4:3 / 600x450px) - Gulab Jamun
24. dessert-sundae.jpg (4:3 / 600x450px) - Chocolate Sundae
25. beverage-lime-soda.jpg (4:3 / 600x450px) - Fresh Lime Soda
26. beverage-cold-coffee.jpg (4:3 / 600x450px) - Cold Coffee
27. beverage-orange-juice.jpg (4:3 / 600x450px) - Fresh Orange Juice
28. beverage-buttermilk.jpg (4:3 / 600x450px) - Masala Buttermilk
29. chef-team.jpg (4:3 / 800x600px) - Master Chefs Team
30. celebration-birthday.jpg (4:3 / 800x600px) - Birthday Celebrations

### Replacement Instruction:
In each HTML file, look for the comment:
`<!-- IMAGE PLACEHOLDER: ... -->`
Replace the `.img-placeholder` `<div>` element with:
`<img src="assets/images/<filename>.jpg" alt="<Descriptive Alt Text>" class="img-fluid" />`
Add `.img-fluid { width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md); }` to `style.css` if necessary.
