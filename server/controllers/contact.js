const Contact = require('../models/contact');

/**
 * Contact controller with request handlers
 */
const contactController = {
  /**
   * Submit a new contact message
   * @route POST /api/contacts
   * @access Public
   */
  submitContact: async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      // Create contact message
      const contact = await Contact.create({
        name,
        email,
        phone,
        message
      });
      
      res.status(201).json({
        message: 'Contact message submitted successfully',
        contact
      });
    } catch (error) {
      console.error('Submit contact error:', error.message);
      res.status(500).json({ message: 'Server error while submitting contact message' });
    }
  },
  
  /**
   * Get all contact messages (admin only)
   * @route GET /api/contacts
   * @access Admin
   */
  getContacts: async (req, res) => {
    try {
      const { 
        status, 
        search,
        limit = 10,
        page = 1
      } = req.query;
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Build filters
      const filters = {};
      
      if (status) filters.status = status;
      if (search) filters.search = search;
      
      // Get contacts
      const result = await Contact.findAll(
        filters,
        parseInt(limit),
        offset
      );
      
      res.json({
        contacts: result.contacts,
        pagination: {
          ...result.pagination,
          page: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Get contacts error:', error.message);
      res.status(500).json({ message: 'Server error while fetching contacts' });
    }
  },
  
  /**
   * Get contact by ID (admin only)
   * @route GET /api/contacts/:id
   * @access Admin
   */
  getContactById: async (req, res) => {
    try {
      const contactId = req.params.id;
      
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      res.json(contact);
    } catch (error) {
      console.error('Get contact by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching contact message' });
    }
  },
  
  /**
   * Update contact status (admin only)
   * @route PATCH /api/contacts/:id/status
   * @access Admin
   */
  updateContactStatus: async (req, res) => {
    try {
      const contactId = req.params.id;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }
      
      // Check if contact exists
      const existingContact = await Contact.findById(contactId);
      if (!existingContact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      // Update contact status
      const updatedContact = await Contact.updateStatus(contactId, status);
      
      res.json(updatedContact);
    } catch (error) {
      console.error('Update contact status error:', error.message);
      res.status(500).json({ message: 'Server error while updating contact status' });
    }
  },
  
  /**
   * Delete contact (admin only)
   * @route DELETE /api/contacts/:id
   * @access Admin
   */
  deleteContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      
      // Check if contact exists
      const existingContact = await Contact.findById(contactId);
      if (!existingContact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      // Delete contact
      await Contact.delete(contactId);
      
      res.json({ message: 'Contact message deleted successfully' });
    } catch (error) {
      console.error('Delete contact error:', error.message);
      res.status(500).json({ message: 'Server error while deleting contact message' });
    }
  },
  
  /**
   * Get contact statistics (admin only)
   * @route GET /api/contacts/stats
   * @access Admin
   */
  getContactStats: async (req, res) => {
    try {
      const stats = await Contact.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Get contact stats error:', error.message);
      res.status(500).json({ message: 'Server error while fetching contact statistics' });
    }
  }
};

module.exports = contactController;