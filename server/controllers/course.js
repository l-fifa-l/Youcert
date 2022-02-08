import Course from '../models/course';

//!Add a course
export const addCourse = async (req, res) => {
  try {
    let {
      title,
      slug,
      videoId,
      playlistId,
      thumbnail,
      creator,
      description,
      tags,
    } = req.body;
    thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    videoId = `https://www.youtube-nocookie.com/embed/${videoId}`;
    playlistId = `https://www.youtube-nocookie.com/embed/${playlistId}`;

    if (!title) return res.status(400).send('Title is required');
    if (!thumbnail) return res.status(400).send('Thumbnail is required');
    if (!description) return res.status(400).send('Title is required');
    if (!slug) return res.status(400).send('slug is required');

    //register
    const course = new Course({
      title,
      videoId,
      playlistId,
      thumbnail,
      author: creator,
      description,
      tags,
      slug,
    });

    await course.save();
    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error! Try Again');
  }
};

//!Get a course
export const getACourse = async (req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      res.json(course);
      console.log(course);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};

//!Get all course
export const getAllCourse = async (req, res) => {
  Course.find()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// complete a course function
export const completeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    //if user with that course has allready completed
    const existing = await Completed.findOne({
      user: req.user._id,
      course: courseId,
    }).exec();
    if (existing) {
      //update
      const updated = await Completed.findOneAndUpdate({
        user: req.user._id,
        course: courseId,
      }).exec();
      res.json({ ok: true });
    } else {
      //create
      const create = await new Completed({
        user: req.user._id,
        course: courseId,
      }).save();
      res.json({ ok: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// Incomplete course function
export const incompleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const updated = await Completed.findOneAndUpdate({
      user: req.user._id,
      course: courseId,
    }).exec();
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
