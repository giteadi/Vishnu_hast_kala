const cloudinary = require('../config/cloudinary');
const fs = require('fs');

/**
 * Upload controller with request handlers
 */
const uploadController = {
  /**
   * Upload a single file to Cloudinary
   * @route POST /api/upload/single
   * @access Private
   */
  uploadSingleFile: async (req, res) => {
    try {
      // Check if file exists
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      // Get file path
      const filePath = req.file.path;
      
      // Upload to Cloudinary
      const folder = req.body.folder || 'vishnu_hast_kala';
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'auto'
      });
      
      // Delete local file after upload
      fs.unlinkSync(filePath);
      
      // Return Cloudinary URL
      res.json({
        url: result.secure_url,
        public_id: result.public_id
      });
    } catch (error) {
      console.error('Upload file error:', error.message);
      
      // Delete local file if it exists
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting local file:', unlinkError.message);
        }
      }
      
      res.status(500).json({ message: 'Server error while uploading file' });
    }
  },
  
  /**
   * Delete a file from Cloudinary
   * @route DELETE /api/upload/:public_id
   * @access Private
   */
  deleteFile: async (req, res) => {
    try {
      const publicId = req.params.public_id;
      
      if (!publicId) {
        return res.status(400).json({ message: 'Public ID is required' });
      }
      
      // Delete from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        res.json({ message: 'File deleted successfully' });
      } else {
        res.status(404).json({ message: 'File not found or already deleted' });
      }
    } catch (error) {
      console.error('Delete file error:', error.message);
      res.status(500).json({ message: 'Server error while deleting file' });
    }
  },
  
  /**
   * Upload multiple files to Cloudinary
   * @route POST /api/upload/multiple
   * @access Private
   */
  uploadMultipleFiles: async (req, res) => {
    try {
      // Check if files exist
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
      
      const folder = req.body.folder || 'vishnu_hast_kala';
      const uploadResults = [];
      
      // Upload each file to Cloudinary
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder,
            resource_type: 'auto'
          });
          
          uploadResults.push({
            originalName: file.originalname,
            url: result.secure_url,
            public_id: result.public_id
          });
          
          // Delete local file after upload
          fs.unlinkSync(file.path);
        } catch (uploadError) {
          console.error(`Error uploading ${file.originalname}:`, uploadError.message);
          
          // Delete local file if upload failed
          try {
            fs.unlinkSync(file.path);
          } catch (unlinkError) {
            console.error('Error deleting local file:', unlinkError.message);
          }
        }
      }
      
      res.json({
        message: `${uploadResults.length} files uploaded successfully`,
        files: uploadResults
      });
    } catch (error) {
      console.error('Upload multiple files error:', error.message);
      
      // Delete any local files that might exist
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          try {
            fs.unlinkSync(file.path);
          } catch (unlinkError) {
            console.error(`Error deleting local file ${file.path}:`, unlinkError.message);
          }
        }
      }
      
      res.status(500).json({ message: 'Server error while uploading files' });
    }
  }
};

module.exports = uploadController;