const courses = [
    { 'id': 1, 'name': "course1" },
    { 'id': 2, 'name': "course2" },
    { 'id': 3, 'name': "course3" }];

    //Used for input validation
const Joi = require("joi");
const express = require("express");
const router = express.Router();
//Takes two arguments the path or URL and a callback function - runs when there is a get request.
router.get('/', function (request, response) {
    response.send(courses);
});

let validateCourse = function (course) {
    //Make a schema for joy
    const schema = {
        'name': Joi.string().min(3).required()
    };

    //Do our validation
    return Joi.validate(course, schema);
};

//:id is the param. but id can be anything
/*
* /api/posts/:year/:month
* console.log(request.params)
* /api/posts/2018/1
* {
*   'year': 2018,
*   'month': 1
* }
* /api/posts/2018/1?sortBy=name
* request.query (don't have to put this in the .get(url) section)
* {
*   sortBy: 'name'
* }
*/

//Pulls from the course array up top
router.get("/:id", function (request, response) {
    // Method on every array
    const course = courses.find(function(c) {
        return parseInt(c.id) === parseInt(request.params.id);
    });

    if(!course) {
        response.status(404).send('The course with the given ID was not found.');
    }
    response.send(course);
});

router.delete('/:id', function(request, response) {

    //lookup the course
    //not existing 404
    const course = courses.find(function(c) {
        return parseInt(c.id) === parseInt(request.params.id);
    });

    if(!course) {
        response.status(404).send('The course with the given ID was not found.');
        return;
    }
    //DELETE
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the same course
    response.send(course)
});

//Post to update and add a new course
router.post('/', function(request, response) {

    // if(!request.body.name || request.body.length < 3) {
    //     //400 bad requests
    //     response.status(400).send("Name is required and a min of 3 chars");
    //     return;
    // }

    const result = validateCourse(request.body);

    if(result.error) {
            //400 bad requests
            response.status(400).send(result.error.details[0].message);
            return;
        }
    const course = {
        'id': courses.length + 1,
        "name": request.body.name
    };

    courses.push(course);

    response.send(course);
});

router.put("/api/courses/:id", function(request, response) {
    //lookup course

    //no exist 404
    const course = courses.find(function(c) {
        return parseInt(c.id) === parseInt(request.params.id);
    });

    if(!course) {
        response.status(404).send('The course with the given ID was not found.');
        return;
    }

    const result = validateCourse(request.body);
    if(result.error) {
        //400 bad requests
        response.status(400).send(result.error.details[0].message);
        return;
    }

    //update course
    course.name = request.body.name;

    //everything is ok, update and return update course to client.
    response.send(course);
});

module.exports = router;