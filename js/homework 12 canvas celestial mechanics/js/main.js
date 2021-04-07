// Array of space objects
let spaceObjectsArray = []

// Space objects class
function SpaceObject (positionX, positionY, velocityX, velocityY, mass) {

    // Position, meters
    this.positionX = positionX
    this.positionY = positionY

    // Velocity, meters per second
    this.velocityX = velocityX
    this.velocityY = velocityY

    // Mass, kilograms 
    this.mass = mass

}

// "Push me and then just touch me"
spaceObjectsArray.push(new SpaceObject(
    3840000000,
    0,
    0,
    120000,
    1000000
))

// Difference in time between steps of calculation
const TIME_SHIFT = 1

// Space-time continuum 
let continum = {
    time: 0, // seconds
    minX: 0, // meters
    maxX: 0, // meters
    minY: 0, // meters
    maxY: 0 // meters
}

// Function to calculate position in shift time
calculatePositions(spaceObjectsArray, TIME_SHIFT)
function calculatePositions(spaceObjectsArray, timeShift) {

    // And the God said...
    const GRAVITATIONAL_CONSTANT = 6.674e-11

    // Calculate mass center


    // For every space object
    for (let curentSpaceObject of spaceObjectsArray) {

        // Acceleration, meters per square second
        let accelerationX = 0
        let accelerationY = 0

        // For every anothe space object
        for (let anotherSpaceObject of spaceObjectsArray) {

            // If it isn't current space object
            if (curentSpaceObject !== anotherSpaceObject) {

                // Calculate distance
                let distance = Math.pow( (Math.pow( (anotherSpaceObject.positionX - curentSpaceObject.positionX), 2 ) + Math.pow( (anotherSpaceObject.positionY - curentSpaceObject.positionY), 2 ) ), 0.5 )

                // Calculate acceleration scale value
                let accelerationScale = GRAVITATIONAL_CONSTANT * anotherSpaceObject.mass / Math.pow(distance, 2)

                // Calculate acceletation projections to coordinate axis
                accelerationX += (anotherSpaceObject.positionX - curentSpaceObject.positionX) * accelerationScale / distance
                accelerationY += (anotherSpaceObject.positionY - curentSpaceObject.positionY) * accelerationScale / distance

            }

        }

        // Calculate velocity
                

        // Calculate position

    }
    


}