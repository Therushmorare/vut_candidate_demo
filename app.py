from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configurations (optional)
app.config['SECRET_KEY'] = 'BMATEST_APP'
app.config['DEBUG'] = True  # Turn off in production

# Home route
@app.route('/')
def home():
    return render_template('index.html')  # Make sure you have templates/index.html

# Example API route
@app.route('/login', methods=['GET'])
def login():
    return render_template('candidates/login.html')

@app.route('/signup', methods=['GET'])
def signup():
    return render_template('candidates/signup.html')

@app.route('/candidateForgotPassword', methods=['GET'])
def candidateForgotPassword():
    return render_template('candidates/forgot.html')

@app.route('/internalEmpForgot', methods=['GET'])
def internalEmpForgot():
    return render_template('candidates/forgot_internal.html')

@app.route('/candidateHelp', methods=['GET'])
def candidateHelp():
    return render_template('candidates/help.html')

@app.route('/candidateVerify', methods=['GET'])
def candidateVerify():
    return render_template('candidates/verify.html')

@app.route('/profileSetup', methods=['GET'])
def profileSetup():
    return render_template('candidates/profile_setup.html')

@app.route('/employeeProfileSetup', methods=['GET'])
def employeeProfileSetup():
    return render_template('employees/profile_setup.html')

@app.route('/candidateDashboard', methods=['GET'])
def candidateDashboard():
    return render_template('candidates/dashboard.html')

@app.route('/employeeDashboard', methods=['GET'])
def employeeDashboard():
    return render_template('employees/dashboard.html')

@app.route('/cvGuidelines', methods=['GET'])
def cvGuidelines():
    return render_template('candidates/guidelines.html')

@app.route('/employeeCvGuidelines', methods=['GET'])
def employeeCvGuidelines():
    return render_template('employees/guidelines.html')

@app.route('/account', methods=['GET'])
def account():
    return render_template('candidates/profile.html')

@app.route('/employeeProfile', methods=['GET'])
def employeeProfile():
    return render_template('employees/profile.html')

@app.route('/applications', methods=['GET'])
def applications():
    return render_template('candidates/applications.html')

@app.route('/employeeApplications', methods=['GET'])
def employeeApplications():
    return render_template('employees/applications.html')

@app.route('/interviews', methods=['GET'])
def interviews():
    return render_template('candidates/interviews.html')

@app.route('/employeeInterviews', methods=['GET'])
def employeeInterviews():
    return render_template('employees/interviews.html')

@app.route('/offers', methods=['GET'])
def offers():
    return render_template('candidates/offers.html')

@app.route('/employeeOffers', methods=['GET'])
def employeeOffers():
    return render_template('employees/offers.html')

@app.route('/accountSettings', methods=['GET'])
def accountSettings():
    return render_template('candidates/account_settings.html')

@app.route('/employeeAccountSettings', methods=['GET'])
def employeeAccountSettings():
    return render_template('employees/account_settings.html')

@app.route('/bookmarks', methods=['GET'])
def bookmarks():
    return render_template('candidates/bookmarks.html')

@app.route('/employeeBookmarks', methods=['GET'])
def employeeBookmarks():
    return render_template('employees/bookmarks.html')

@app.route('/notifications', methods=['GET'])
def notifications():
    return render_template('candidates/notifications.html')

@app.route('/employeeNotifications', methods=['GET'])
def employeeNotifications():
    return render_template('employees/notifications.html')

@app.route('/viewPost/<string:jid>', methods=['GET'])
def viewPost(jid):
    job_id = jid
    return render_template('candidates/view_job.html', job_id=job_id)

@app.route('/viewInternalPost/<string:jid>', methods=['GET'])
def viewInternalPost(jid):
    job_id = jid
    return render_template('employees/view_job.html', job_id=job_id)

@app.route('/jobApplication/<string:jid>', methods=['GET'])
def jobApplication(jid):
    job_id = jid
    return render_template('candidates/apply.html', job_id=job_id)

@app.route('/viewJobApplication/<string:aid>', methods=['GET'])
def viewJobApplication(aid):
    application_id = aid
    return render_template('candidates/view_application.html', application_id=application_id)

@app.route('/viewInternalJobApplication', methods=['GET'])
def viewInternalJobApplication():
    return render_template('employees/view_application.html')

# Error handling example
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Server error"}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
