const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require("mongodb");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const Client = require("../models/clientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Booked = require("../models/bookingModel");
const User = require("../models/userModel");

// * GridFS storage configuration
const storage = new GridFsStorage({
  url: process.env.DATABASE_LOCAL,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "images",
        filename: `${Date.now()}_${file.originalname}`,
      };
    }
  },
});

const upload = multer({ storage });

// * uploadImages
exports.uploadImages = upload.array("files", 2);

// * update Images
exports.updateClientPhotos = catchAsync(async (req, res, next) => {
  req.body.bestWork = req.files.map((file) => file.filename);

  const client = await Client.findByIdAndUpdate(req.params.id, req.body);
  res.send({ status: "success", client });
});

// * Get Images with id
exports.getImages = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new AppError("No client found with that ID"));
  }

  const { db } = mongoose.connection;
  const imageBucket = new GridFSBucket(db, { bucketName: "images" });

  const filenames = client.bestWork;

  // ? when query images with file names
  // const filenames = req.query.filenames ? req.query.filenames.split(",") : [];

  if (!filenames.length) {
    return res.status(400).send({ error: "No filenames provided" });
  }

  const imagePromises = filenames.map((filename) => {
    return new Promise((resolve, reject) => {
      const imageData = [];
      const downloadStream = imageBucket.openDownloadStreamByName(filename);

      downloadStream.on("data", function(data) {
        imageData.push(data);
      });

      downloadStream.on("error", function() {
        reject(new AppError(`${filename}, error: "Image not found" `), 400);
      });

      downloadStream.on("end", () => {
        resolve({
          filename,
          data: Buffer.concat(imageData).toString("base64"),
        });
      });
    });
  });

  const images = await Promise.all(imagePromises.map((p) => p.catch((e) => e)));

  const successfulImages = images.filter((image) => image.data);
  const failedImages = images.filter((image) => image.error);

  res.status(200).send({
    successfulImages,
    failedImages,
  });
});

// * Get all Clients
exports.getAllClients = catchAsync(async (req, res, next) => {
  const client = await Client.find();

  res.status(200).json({
    status: "success",
    results: client.length,
    data: {
      client,
    },
  });
});

// * Create Client
exports.createClient = catchAsync(async (req, res, next) => {
  const newClient = await Client.create(req.body);
  await User.findByIdAndUpdate(req.body.userId, {
    role: "client",
    clientId: newClient._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      newClient,
    },
  });
});

// * Get Client by id
exports.getClientByID = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return res.status(200).json({ message: "No client for this userid" });
  }
  res.status(200).json({
    status: "success",
    data: {
      client,
    },
  });
});

// * update client
exports.updateClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!client) {
    return next(new AppError("No client found with that ID"));
  }
});
// * delete client
exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return next(new AppError("No client found with that ID"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.clientBooked = catchAsync(async (req, res, next) => {
  const clientId = req.params.clientId;

  const today = new Date();

  const bookings = await Booked.find({
    clientId,
    date: { $gte: today },
    status: "booked",
  })
    .populate("user", "fullName email")
    .populate("itemId")
    .populate("organizingTeam");

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});
