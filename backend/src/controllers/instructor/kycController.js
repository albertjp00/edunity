const kycServices = require('../../services/instructor/kycServices')


const kycSubmit = async (req,res)=>{
    try {

        const idProof = req.files['idProof']?.[0]
        const addressProof = req.files['addressProof']?.[0]

        const id = req.instructor.id
        console.log('kyc submit ');



        const result = await kycServices.kycSubmit(idProof.filename,addressProof.filename,id)
        
        if (result) {
      return res.json({ success: true, message: 'KYC submitted successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to submit KYC' });
    }

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {kycSubmit}