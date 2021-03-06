import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const AuthorForm = ({ author, onSave, onDelete, onChange, saving, deleting, errors }) => {
    return (
        <form>
            <h1>Manage Author</h1>
            <TextInput
                name="firstName"
                label="First Name"
                value={author.firstName}
                onChange={onChange}
                error={errors.firstName} />
            <TextInput
                name="lastName"
                label="Last Name"
                value={author.lastName}
                onChange={onChange}
                error={errors.lastName} />
            <TextInput
                name="department"
                label="Department"
                value={author.department}
                onChange={onChange}
                error={errors.department} />
            <TextInput
                name="phone"
                label="Phone"
                value={author.phone}
                onChange={onChange}
                error={errors.phone} />

            <input
                type="submit"
                disabled={saving || deleting}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
            <input
                type="submit"
                disabled={saving || deleting}
                value={deleting ? 'Deleting...' : 'Delete'}
                className="btn btn-primary"
                onClick={onDelete} />
        </form>
    );
};

AuthorForm.propTypes = {
    author: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    deleting: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default AuthorForm;
