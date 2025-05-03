# Development Difficulties and Solutions

## P5.js Integration Issues

1. **Keyboard Event Interception**

   - **Problem**: Trying to intercept keypress events through p5.js
   - **Solution**: Use React's event system instead of p5's built-in event handling

2. **Coordinate System Mismatch**

   - **Problem**: Matter.js uses center-based coordinates while p5.js uses corner-based coordinates by default
   - **Solution**: Set `rectMode(CENTER)` in p5.js to match Matter.js coordinate system

3. **State Management Between React and p5.js**

   - **Problem**: Difficulty synchronizing state between React/Redux and the p5.js sketch
   - **Solution**: Use refs to share state between React and p5.js, and explicitly update the p5 instance when Redux state changes

4. **Timer Implementation**

   - **Problem**: Timer not updating correctly in the game UI
   - **Solution**: Calculate time based on p5's millis() function and pass it to the UI rendering function

5. **Game Initialization**
   - **Problem**: Game starting automatically instead of waiting for user input
   - **Solution**: Initialize game in paused state and start only after specific user interaction

## Redux Integration

1. **Redux State Not Reflecting in p5.js**

   - **Problem**: Redux state updates not affecting the p5.js sketch
   - **Solution**: Create explicit synchronization between Redux state and p5.js using useEffect hooks

2. **Event Handling Conflicts**
   - **Problem**: Docusaurus intercepting keyboard events before they reach the game
   - **Solution**: Attach event listeners at the window level in React instead of relying on p5's event system
