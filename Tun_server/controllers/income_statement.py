from flask import jsonify, request
from Tun_server.models.income_statement import Income_Statement
from Tun_server import app

@app.route('/income/monthly', methods=['GET'])
def get_monthly_income():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)

    if year is None or month is None:
        return jsonify({'error': 'Year and month parameters are required'}), 400

    monthly_total = Income_Statement.get_monthly_total(year, month)
    return jsonify({'year': year, 'month': month, 'monthly_total': monthly_total})


@app.route('/income/annual', methods=['GET'])
def get_annual_income():
    year = request.args.get('year', type=int)

    if year is None:
        return jsonify({'error': 'Year parameter is required'}), 400

    annual_total = Income_Statement.get_annual_total(year)
    return jsonify({'year': year, 'annual_total': annual_total})

@app.route('/income', methods=['POST'])
def create_income_statement():
    total = request.form.get('total', type=float)

    if total is None:
        return jsonify({'error': 'Total is required'}), 400

    data = {'total': total}
    record_id = Income_Statement.save(data)
    if record_id:
        return jsonify({'message': 'Income statement created successfully', 'id': record_id}), 201
    else:
        return jsonify({'error': 'Failed to create income statement'}), 500


@app.route('/income/<int:income_id>', methods=['PATCH'])
def update_income_statement(income_id):
    total = request.form.get('total', type=float)

    if total is None:
        return jsonify({'error': 'Total is required'}), 400

    # Assuming you have an update method in your Income_Statement class
    updated = Income_Statement.update({'id': income_id, 'total': total})
    if updated:
        return jsonify({'message': 'Income statement updated successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update income statement'}), 500
