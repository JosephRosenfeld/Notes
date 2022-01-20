/*Resources:
https://www.youtube.com/watch?v=t2ypzz6gJm0&t=16s&ab_channel=WebDevSimplified
*/

/*useRef is very similar in that it creates some data that persists between renders,
however it differs from useState because if a value created by the useRef hook changes,
it doesn't force the component to rerender*/

/*The most common use case of this is to store some DOM element in a ref, so common
in fact that JSX elements have a default property called ref that will automatically
assign that element to that ref*/
