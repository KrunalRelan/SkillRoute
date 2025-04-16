import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RegisterCompany } from '../../models/RegisterCompany';
import { updateCompany, getCategories } from '../../../services/CompanyService';
import { Category } from '../../models/Category';
import { toast } from 'react-toastify';

interface EditCompanyModalProps {
  show: boolean;
  onHide: () => void;
  company: RegisterCompany;
  onSuccess: () => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  show,
  onHide,
  company,
  onSuccess
}) => {
  const [formData, setFormData] = useState<RegisterCompany>({
    ...company,
    image: company.image || 'default.jpg'
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData({
      ...company,
      image: company.image || 'default.jpg'
    });
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const selectedCategory = categories.find(cat => cat.categoryId === selectedId);

    setFormData(prev => ({
      ...prev,
      categoryId: selectedId,
      categoryName: selectedCategory?.categoryName || ''
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.enquirerName.trim()) {
      newErrors.enquirerName = 'Enquirer name is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const dataToSubmit = {
        ...formData,
        image: formData.image || 'default.jpg'
      };
      await updateCompany(company.companyId!, dataToSubmit);
      toast.success('Company updated successfully');
      onSuccess();
      onHide();
    } catch (error) {
      toast.error('Failed to update company');
      console.error('Error updating company:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <div className="invalid-feedback">{errors.companyName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Enquirer Name</label>
            <input
              type="text"
              className={`form-control ${errors.enquirerName ? 'is-invalid' : ''}`}
              name="enquirerName"
              value={formData.enquirerName}
              onChange={handleChange}
            />
            {errors.enquirerName && (
              <div className="invalid-feedback">{errors.enquirerName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="addressLine"
              value={formData.addressLine || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postalCode"
              value={formData.postalCode || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Category</label>
            <select
              className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
              name="categoryId"
              value={formData.categoryId || ''}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <div className="invalid-feedback">{errors.categoryId}</div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onHide}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCompanyModal; 