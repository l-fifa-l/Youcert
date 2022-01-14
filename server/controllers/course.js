import Course from "../models/course";

//!Add a course
export const addCourse = async (req, res) => {
  try {
    let { title, videoId, playlistId, thumbnail, creator, description, tags } =
      req.body;
    thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    videoId = `https://www.youtube-nocookie.com/embed/${videoId}`;
    playlistId = `https://www.youtube-nocookie.com/embed/${playlistId}`;

    if (!title) return res.status(400).send("Title is required");
    if (!thumbnail) return res.status(400).send("Thumbnail is required");
    if (!description) return res.status(400).send("Title is required");

    //register
    const course = new Course({
      title,
      videoId,
      playlistId,
      thumbnail,
      author: creator,
      description,
      tags,
    });

    await course.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error! Try Again");
  }
};

//!Get a course
export const getACourse = async (req, res) => {
  Course.findById(req.params.id)
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));
};

//!Get all course
export const getAllCourse = async (req, res) => {
  Course.find()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json("Error: " + err));
};
