const express = require("express");
const Person = require("../Models/PersonSchema");
const router = express.Router();

router.post("/addPerson", async (req, res) => {
  try {
    const person = new Person(req.body); 
    await Person.create(person);
    res.status(201).send({ msg: "Person added successfully", person });
  } catch (error) {
    console.error("Error adding person:", error);
    res.status(500).send({ msg: "Server error", error });
  }
});

router.get("/getPerson/:name", async (req, res) => {
  try {
    const person = await Person.find( { name : req.params.name } );
    res.status(200).send(person);
  } catch (error) {
    console.error("Error getting person:", error);
    res.status(500).send({ msg: "Server error", error });
  }
});

router.get("/getPersonById/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.status(200).send(person);
  } catch (error) {
    console.error("Error getting person:", error);
    res.status(500).send({ msg: "Server error", error });
  }
});

router.put("/updatePersonById/:id", async (req, res) => {

    try {
      const person = await Person.findById(
        req.params.id
      );

      if (!person) {
        return res.status(404).send({ msg: "Person not found" });
      } 

      person.favoriteFoods.push("Hamburger");

      await person.save();

      res.status(200).send({ msg: "Person updated successfully", person });
    } catch (error) {
      console.error("Error updating person:", error);
      res.status(500).send({ msg: "Server error", error });
    }
});

router.put("/updatePersonByName/:name", async (req, res) => {
    try {
      const person = await Person.findOneAndUpdate(
        { name: req.params.name },
        { $push: { favoriteFoods: "Hamburger" } },
        { new: true }
      );
  
      if (!person) {
        return res.status(404).send({ msg: "Person not found" });
      }
  
      res.status(200).send({ msg: "Person updated successfully", person });
    } catch (error) {
      console.error("Error updating person:", error);
      res.status(500).send({ msg: "Server error", error });
    }
});

router.delete("/deletePersonById/:id", async (req, res) => {
    try {
      const person = await Person.findByIdAndDelete(req.params.id);
      res.status(200).send({ msg: "Person deleted successfully", person });
    } catch (error) {
      console.error("Error deleting person:", error);
      res.status(500).send({ msg: "Server error", error });
    }
});


router.delete("/deletePeopleByName/:name", async (req, res) => {
    try {
      const result = await Person.deleteMany({ name: req.params.name });
  
      if (result.deletedCount === 0) {
        return res.status(404).send({ msg: `No people named ${req.params.name} were found.` });
      }
  
      res.status(200).send({msg: `${result.deletedCount} person(s) named ${req.params.name} deleted successfully.`,result});
    } catch (error) {
      console.error("Error deleting people:", error);
      res.status(500).send({ msg: "Server error", error });
    }
  });
  
  router.get("/Burrito", async (req, res) => {
    try {
      const people = await Person.find({ favoriteFoods: "burritos" })  
        .sort({ name: 1 }) 
        .limit(2)  
        .select("-age")  
        .exec();  
  
      res.status(200).send(people);  
    } catch (error) {
      console.error("Error fetching burrito lovers:", error);
      res.status(500).send({ msg: "Server error", error });
    }
  });
  

module.exports = router;
