import traceback
import pymongo
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb+srv://noamv:12345@cluster0.5vok1pd.mongodb.net/?retryWrites=true&w=majority")
db = client["DMA"]
guides_collection = db["guides"]
request_guides_collection = db["requests"]


@app.route('/guide/<domain>/<guide_name>', methods=['GET'])
def get_guide(domain, guide_name):
    guide = guides_collection.find_one({"domain": domain, "guide_name": guide_name}, {"_id": False})
    if guide:
        return jsonify(guide)
    else:
        return jsonify({"message": "Guide not found"}), 404

# define a route to insert a new request
@app.route('/request_guide', methods=['POST'])
def insert_request_guide():
    try:
        r_guide = request.get_json()
        result = request_guides_collection.insert_one(r_guide)
        
        return jsonify({"message": "Request guide inserted", "id": str(result.inserted_id)}), 201
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "An error occurred"}), 500

@app.route('/guide', methods=['POST'])
def insert_guide():
    guide = request.get_json()
    print(guide)
    result = guides_collection.insert_one(guide)
    return jsonify({"message": "Guide inserted", "id": str(result.inserted_id)}), 201

@app.route('/guides/<domain>', methods=['GET'])
def get_guides_by_domain(domain):
    guides = guides_collection.find({"domain": domain}, {"_id": False})
    guides_list = list(guides)
    if guides_list:
        return jsonify(guides_list)
    else:
        return jsonify({"message": "No guides found for the specified domain"}), 404


@app.route('/domains', methods=['GET'])
def get_domains():
    domains = []  
    distinct_domains = guides_collection.distinct("domain")
    domains = list(distinct_domains) 
    return jsonify(domains)


if __name__ == '__main__':
    app.run(debug=True)