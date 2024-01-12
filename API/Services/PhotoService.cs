using API.Helper;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        public Cloudinary _cloud;
        public PhotoService(IOptions<CloudinarySetting> config)
        {
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
            config.Value.ApiSecret
);
            _cloud = new Cloudinary(acc);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "da-net7u"
                };
                uploadResult = await _cloud.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicID)
        {
            var deleteParams = new DeletionParams(publicID);
            return await _cloud.DestroyAsync(deleteParams);
        }
    }
}